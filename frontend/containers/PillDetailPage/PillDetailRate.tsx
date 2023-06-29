import React from 'react';

type Props = {
  graphValue: Array<number>;
  statistic: Array<number>;
};

function PillDetailRate(props: Props) {
  return (
    <div className="col-span-1">
      <div className="w-5/6 h-40 mx-auto my-2">
        <div className="grid grid-cols-5 text-center pt-6">
          {props.graphValue.map((value, idx) => (
            <div key={idx} className="col-span-1 rounded-lg">
              <div
                className="tooltip tooltip-open"
                data-tip={props.statistic[idx]}
              ></div>
              <div className="bg-gray-100 w-1/3 h-20 mx-auto flex items-stretch rounded-lg">
                <div
                  className={`bg-blue-100 w-full self-end rounded-lg`}
                  style={{ height: `${value}%` }}
                ></div>
              </div>
              <div className="text-gray-600 tx-sm">{idx + 1}점</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PillDetailRate;
