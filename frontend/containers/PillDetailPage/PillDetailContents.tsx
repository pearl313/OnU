import React from 'react';

type Props = {
  subject: string;
  content: string;
};

function PillDetailContents(props: Props) {
  return (
    <div>
      <div className="bg-white min-h-[60px] px-5 py-30 grid grid-cols-6 rounded-lg mt-3">
        <div className="col-span-1 grid content-center font-semibold whitespace-pre-line">
          <span className="w-14">{props.subject}</span>
        </div>
        <div className="col-span-5 grid content-center py-8 text-sm">
          {props.content}
        </div>
      </div>
    </div>
  );
}

export default PillDetailContents;
