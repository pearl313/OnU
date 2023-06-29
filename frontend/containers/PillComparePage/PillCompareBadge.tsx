import React from 'react';
import Image from 'next/image';

type Props = {
  subject: string;
  first: string[];
  second: string[];
};

function PillCompareBox(props: Props) {
  const shortFunc = (type: string): string[] => {
    const str = [];
    switch (type) {
      case '뼈 및 관절 건강과 근력 개선':
        str.push('뼈/관절');
        str.push(
          'https://pilly.kr/images/store/concern/icon-joints_bone_off.png',
        );
        break;
      case '눈 건강 (시력 및 피로감 케어)':
        str.push('눈 건강');
        str.push(
          'https://pilly.kr/images/store/concern/icon-ophthalmologic_off.png',
        );
        break;
      case '간 건강':
        str.push('간 건강');
        str.push(
          'https://pilly.kr/images/store/concern/icon-liver_health_off.png',
        );
        break;
      case '장 건강':
        str.push('장 건강');
        str.push(
          'https://pilly.kr/images/store/concern/icon-intestinal_health_off.png',
        );
        break;
      case '면역력 개선':
        str.push('면역력 개선');
        str.push(
          'https://pilly.kr/images/store/concern/icon-immune_function_off.png',
        );
        break;
      case '혈압 및 혈행 개선':
        str.push('혈행 개선');
        str.push(
          'https://pilly.kr/images/store/concern/icon-skin_health_off.png',
        );
        break;
      case '혈당 조절':
        str.push('혈당 조절');
        str.push(
          'https://pilly.kr/images/store/concern/icon-stomache_off.png',
        );
        break;
      case '혈중 콜레스테롤 개선':
        str.push('콜레스테롤');
        str.push(
          'https://pilly.kr/images/store/concern/icon-constipation_off.png',
        );
        break;
      case '체지방 감소':
        str.push('체지방 감소');
        str.push(
          'https://pilly.kr/images/store/concern/icon-diet_off.png',
        );
        break;
      case '항산화':
        str.push('항산화');
        str.push(
          'https://pilly.kr/images/store/concern/icon-anti_oxidation_off.png',
        );
        break;
      case '스트레스 및 피로 개선':
        str.push('피로 개선');
        str.push(
          'https://pilly.kr/images/store/concern/icon-vitality_off.png',
        );
        break;
      case '갱년기 여성':
        str.push('갱년기 여성');
        str.push(
          'https://pilly.kr/images/store/concern/icon-gyniatrics_off.png',
        );
        break;
      case '갱년기 남성':
        str.push('갱년기 남성');
        str.push(
          'https://pilly.kr/images/store/concern/icon-androgenic_health_off.png',
        );
        break;
      case '질 건강':
        str.push('질 건강');
        str.push(
          'https://pilly.kr/images/store/concern/icon-pregnancy_off.png',
        );
        break;
      case '정자 운동성':
        str.push('정자 운동성');
        str.push(
          'https://pilly.kr/images/store/concern/icon-hair_scalp_off.png',
        );
        break;
    }
    return str;
  };
  return (
    <div className="mb-6">
      <hr className="mx-4" />
      <div className="grid py-4 mx-4 bg-white tabs justify-items-center">
        <div className="font-semibold">{props.subject}</div>
      </div>
      <hr className="mx-4" />
      <div className="mx-4">
        <div className="grid grid-cols-2 py-2">
          <div className="col-span-1 py-4 mr-2 bg-white border rounded-lg">
            {/* <ul>
              {props.first.map((item, idx) => (
                <li
                  className="bg-[#90B5EA] text-white my-1 mx-3 text-center rounded-2xl py-1"
                  key={idx}
                >
                  {item}
                </li>
              ))}
            </ul> */}
            <div className="flex flex-wrap justify-center">
              {props.first.map((badge, idx) => (
                <div
                  className="w-1/2 grid justify-center m-2 mt-5 text-[#424B5A] whitespace-pre text-sm w-20 h-16 sm:w-24 sm:h-20"
                  key={idx}
                >
                  <Image
                    src={shortFunc(badge)[1]}
                    alt="기능"
                    className="w-10 h-10 mx-auto"
                    width={100}
                    height={100}
                  />
                  <div className="text-center">
                    {shortFunc(badge)[0]}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-1 py-4 ml-2 bg-white border rounded-lg">
            <div className="flex flex-wrap justify-center">
              {props.second.map((badge, idx) => (
                <div
                  className="w-1/2 grid justify-center m-2 mt-5 text-[#424B5A] whitespace-pre text-sm w-20 h-16 sm:w-24 sm:h-20"
                  key={idx}
                >
                  <Image
                    src={shortFunc(badge)[1]}
                    alt="기능"
                    className="w-10 h-10 mx-auto"
                    width={100}
                    height={100}
                  />
                  <div className="text-center">
                    {shortFunc(badge)[0]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PillCompareBox;
