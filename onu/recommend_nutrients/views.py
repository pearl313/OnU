import json

import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.metrics.pairwise import cosine_similarity
from django.shortcuts import render, get_object_or_404, get_list_or_404
from pandas import DataFrame
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from django.db import connection
from django.views import View

from .models import Nutrient, Nutrient_type, User, Taking_Nutrient


# Create your views here.
# 전체 영양제 제공
@api_view(['POST'])
def nutrients_all(request):
    # 전달받은 복용중인 영양제 리스트 추가
    taking_nutrient_from_survey = set(request.data.get('takingList'))

    # 사용자와 복용영양제 테이블을 조인
    taking = Taking_Nutrient.objects.distinct().order_by('user_id').values_list('user_id', 'nutrient_id')

    # 사용자와 복용한 영양제 정보를 가져온다
    taking_by_user = list(taking.filter(user_id=request.data.get('user')))

    # 사용자가 복용 중인 영양제를 마이페이지에서 등록을 안했을 때 -> 추천 불가, 필터링만 실행
    if taking_by_user == []:
        if taking_nutrient_from_survey == []:
            return Response([])
        else:
            taking_by_user = taking_nutrient_from_survey

    # 설문과 사용자가 복용중인 모든 영양제 배열
    except_list = []
    for user in taking_by_user:
        except_list.append(user)
    for except_taking_nutrient_from_survey in taking_nutrient_from_survey:
        except_list.append(except_taking_nutrient_from_survey)
    except_list = list(set(except_list))

    # 사용자 아이디만을 가져와서 배열로 변환
    users = []
    for user in list(taking):
        users.append(user[0])

    '''
    1. 설문에서 사용자가 입력한 복용 증 영양제 리스트
        -> db에서 현재 사용자가 입력해둔 복용 중 영양제 리스트랑 합치기
        -> 중복 제거
        -> except_list
    2. (아이디, 영양제) 형태로 db에서 복용 중 영양제 데이터 다 가져와서 새로운 변수에 넣음
        -> 1번에 있는 거는 추가 안함
    '''
    # db에서 복용 영양제 데이터 다 가져와서 영양제 아이디만 배열로 따로 저장
    takings = []
    for takingNutrient in list(taking):
        takings.append(takingNutrient[1])

    # 설문에서 받은 복용 영양제랑 db로 얻은 복용 영양제 데이터랑 비교하면서 db에 있으면 넘기고, 없으면 (user_id, nutrient_id) 형태로 추가
    for takingNutrient in list(taking_nutrient_from_survey):
        # 설문에서 입력한 복용 영양제 + db의 해당 사용자의 복용 영양제 중복 제거해서 합체
        if (request.data.get('user'), takingNutrient) in list(taking):
            continue
        takings.append(takingNutrient)
        users.append(request.data.get('user'))

    values = [1] * len(users)

    # 사용자 리스트와 복용영양제 리스트를 딕셔너리로 변환
    result = {'user_id': users, 'nutrient_id': takings, 'value': values}

    # 딕셔너리를 테이블로 변환
    table = DataFrame(result)
    taking_metrix = table.pivot(index='user_id', columns='nutrient_id', values='value')
    matrix_dummy = taking_metrix.copy().fillna(0)
    user_similarity = cosine_similarity(matrix_dummy, matrix_dummy)
    user_similarity = pd.DataFrame(user_similarity,
                                   index=taking_metrix.index,
                                   columns=taking_metrix.index)

    def CF_knn(user_id, taking_nutrient_id, neighbor_size=0):
        if taking_nutrient_id in taking_metrix.columns:
            sim_scores = user_similarity[user_id].copy()
            nutrient_value = taking_metrix[taking_nutrient_id].copy()
            none_value_idx = nutrient_value[nutrient_value.isnull()].index
            nutrient_value = nutrient_value.dropna()
            sim_scores = sim_scores.drop(none_value_idx)

            if neighbor_size == 0:
                mean_rating = np.dot(sim_scores, nutrient_value) / sim_scores.sum()
            else:
                if len(sim_scores) > 1:
                    neighbor_size = min(neighbor_size, len(sim_scores))
                    sim_scores = np.array(sim_scores)
                    nutrient_value = np.array(nutrient_value)
                    user_idx = np.argsort(sim_scores)
                    sim_scores = sim_scores[user_idx][-neighbor_size:]
                    nutrient_value = nutrient_value[user_idx][-neighbor_size:]
                    mean_rating = np.dot(sim_scores, nutrient_value) / sim_scores.sum()
                else:
                    mean_rating = 0.5
        else:
            mean_rating = 0.5
        return mean_rating

    def recom_nutrient(user_id, n_items, neighbor_size=30):
        user_taking = taking_metrix.loc[user_id].copy()
        for t in taking_metrix.columns:
            if pd.notnull(user_taking.loc[t]):
                user_taking.loc[t] = 0
            else:
                user_taking.loc[t] = CF_knn(user_id, t, neighbor_size)

        nutrient_sort = user_taking.sort_values(ascending=False)[:n_items]
        return list(nutrient_sort.index)

    s = set(except_list)
    result = [x for x in recom_nutrient(request.data.get('user'), n_items=50, neighbor_size=20) if x not in s]
    return Response(result)
