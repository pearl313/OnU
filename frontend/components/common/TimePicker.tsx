import { Fragment, useState, useEffect } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import {
  CheckIcon,
  ChevronUpDownIcon,
} from '@heroicons/react/20/solid';
import api from '@/apis/config';

const times = [
  { name: '00:00' },
  { name: '00:30' },
  { name: '01:00' },
  { name: '01:30' },
  { name: '02:00' },
  { name: '02:30' },
  { name: '03:00' },
  { name: '03:30' },
  { name: '04:00' },
  { name: '04:30' },
  { name: '05:00' },
  { name: '05:30' },
  { name: '06:00' },
  { name: '06:30' },
  { name: '07:00' },
  { name: '07:30' },
  { name: '08:00' },
  { name: '08:30' },
  { name: '09:00' },
  { name: '09:30' },
  { name: '10:00' },
  { name: '10:30' },
  { name: '11:00' },
  { name: '11:30' },
  { name: '12:00' },
  { name: '12:30' },
  { name: '13:00' },
  { name: '13:30' },
  { name: '14:00' },
  { name: '14:30' },
  { name: '15:00' },
  { name: '15:30' },
  { name: '16:00' },
  { name: '16:30' },
  { name: '17:00' },
  { name: '17:30' },
  { name: '18:00' },
  { name: '18:30' },
  { name: '19:00' },
  { name: '19:30' },
  { name: '20:00' },
  { name: '20:30' },
  { name: '21:00' },
  { name: '21:30' },
  { name: '22:00' },
  { name: '22:30' },
  { name: '23:00' },
  { name: '23:30' },
];

export default function TimePicker(props: { onClose: () => void }) {
  const [selected, setSelected] = useState(times[0]);
  const [userId, setUserId] = useState<number>();
  const hour = new Date().getHours();
  const minute = new Date().getMinutes();

  useEffect(() => {
    setUserId(
      Number.parseInt(localStorage.getItem('userId') as string),
    );
  }, [props]);

  const handleSubmit = () => {
    const newDate1 = new Date(
      2022,
      1,
      30,
      parseInt(selected.name.split(':')[0]),
      parseInt(selected.name.split(':')[1]),
      1,
    );

    const newDate2 = new Date(2022, 1, 30, hour, minute, 1);

    const timeDiff =
      (newDate1.getTime() - newDate2.getTime()) / 1000 / 60;

    if (timeDiff < -10 || timeDiff > 10) {
      if (userId !== undefined) api.addAlarm(userId, selected.name);
    } else
      alert(
        '알람 시간이 너무 가깝습니다. 다른 시간대를 선택해 주세요',
      );
    // console.log(selected.name);
    props.onClose();
  };
  return (
    <div className="flex items-baseline space-x-2">
      <div className="w-48 top-16">
        <Listbox value={selected} onChange={setSelected}>
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
              <span className="block truncate">{selected.name}</span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <ChevronUpDownIcon
                  className="w-5 h-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {times.map((time, timeIdx) => (
                  <Listbox.Option
                    key={timeIdx}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active
                          ? 'bg-amber-100 text-amber-900'
                          : 'text-gray-900'
                      }`
                    }
                    value={time}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {time.name}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                            <CheckIcon
                              className="w-5 h-5"
                              aria-hidden="true"
                            />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
      <button className="btn btn-sm" onClick={handleSubmit}>
        설정
      </button>
    </div>
  );
}
