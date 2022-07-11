import BatchSelect from './batchSelect.js';
import { render, screen } from '@testing-library/react';

test('batch select test', () => {
  const batchNo = -1;
  const testData = {
    "id": "af83050f-121c-4851-9ba6-78a1ae70ab48",
    "name": "Test Course",
    "price": 1999.0,
    "is_available": true,
    "batches": [
        {
            "id": "f5fc41b2-ff42-43cb-8fcc-68304751c5fc",
            "seats": 3,
            "start_date": "06/02",
            "end_date": "06/03",
            "time_zone": "PST",
            "start_time": "11PM",
            "end_time": "05AM",
            "name": "A",
            "course": "af83050f-121c-4851-9ba6-78a1ae70ab48"
        },
        {
            "id": "de5b5ea7-d944-45aa-84ec-6f5e9eaf14cf",
            "seats": 20,
            "start_date": "06/02",
            "end_date": "06/03",
            "time_zone": "EST",
            "start_time": "08PM",
            "end_time": "02AM",
            "name": "A",
            "course": "af83050f-121c-4851-9ba6-78a1ae70ab48"
        },
        {
            "id": "f5fc41b2-ff42-43cb-8fcc-68304751c5fc",
            "seats": 3,
            "start_date": "06/20",
            "end_date": "06/23",
            "time_zone": "PST",
            "start_time": "11PM",
            "end_time": "05AM",
            "name": "B",
            "course": "af83050f-121c-4851-9ba6-78a1ae70ab48"
        },
        {
            "id": "043f473b-b0ed-4b89-bb1b-799ce15d8188",
            "seats": 5,
            "start_date": "06/20",
            "end_date": "06/23",
            "time_zone": "EST",
            "start_time": "08AM",
            "end_time": "02PM",
            "name": "B",
            "course": "af83050f-121c-4851-9ba6-78a1ae70ab48"
        },
        {
            "id": "f5fc41b2-ff42-43cb-8fcc-68304751c5fc",
            "seats": 3,
            "start_date": "07/11",
            "end_date": "07/30",
            "time_zone": "PST",
            "start_time": "11PM",
            "end_time": "05AM",
            "name": "C",
            "course": "af83050f-121c-4851-9ba6-78a1ae70ab48"
        },
        {
            "id": "f5fc41b2-ff42-43cb-8fcc-68304751c5fc",
            "seats": 3,
            "start_date": "07/11",
            "end_date": "07/30",
            "time_zone": "EST",
            "start_time": "11PM",
            "end_time": "05AM",
            "name": "C",
            "course": "af83050f-121c-4851-9ba6-78a1ae70ab48"
        },
        {
            "id": "f5fc41b2-ff42-43cb-8fcc-68304751c5fc",
            "seats": 0,
            "start_date": "08/02",
            "end_date": "08/23",
            "time_zone": "PST",
            "start_time": "11PM",
            "end_time": "05AM",
            "name": "D",
            "course": "af83050f-121c-4851-9ba6-78a1ae70ab48"
        },
        {
            "id": "f5fc41b2-ff42-43cb-8fcc-68304751c5fc",
            "seats": 21,
            "start_date": "08/02",
            "end_date": "08/23",
            "time_zone": "EST",
            "start_time": "11PM",
            "end_time": "05AM",
            "name": "D",
            "course": "af83050f-121c-4851-9ba6-78a1ae70ab48"
        }
    ]
  };

    render(
      <BatchSelect 
        batchData={testData} 
        batchIndex={batchNo}/>
    );
    const seatsLeft = screen.getByRole('button', { name: '20 LEFT' });
    const open = screen.getByRole('button', { name: 'OPEN' });
    const soldOut = screen.getByRole('button', { name: 'SOLD OUT' });

    expect(seatsLeft.className.includes('btn bg-yellow my-4 w-1/4 text-center lg:w-11/12 p-2 lg:p-1 inline-block txt-white button active')).toBeTruthy();
    expect(open.className.includes('btn bg-green my-4 w-1/4 text-center lg:w-11/12 p-2 lg:p-1 inline-block txt-white button active')).toBeTruthy();
    expect(soldOut.className.includes('btn bg-red my-4 w-1/4 text-center lg:w-11/12 p-2 lg:p-1 inline-block txt-white button active')).toBeTruthy();
});

