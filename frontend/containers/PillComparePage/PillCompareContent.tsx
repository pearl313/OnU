import React from 'react';

type Props = {
  subject: string;
  first: string;
  second: string;
};

function PillCompareContent(props: Props) {
  return (
    <div className="mb-6">
      <hr className="mx-4" />
      <div className="tabs grid justify-items-center py-4 bg-white mx-4">
        <div className="font-semibold">{props.subject}</div>
      </div>
      <hr className="mx-4" />
      <div className="mx-4">
        <div className="grid grid-cols-2 py-2">
          <div className="bg-white col-span-1 border rounded-lg mr-2 p-4 py-6">
            <div>{props.first}</div>
          </div>
          <div className="bg-white col-span-1 border  rounded-lg ml-2 p-4 py-6">
            <div>{props.second}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PillCompareContent;
