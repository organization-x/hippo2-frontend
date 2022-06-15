import BatchSelect from './batchSelect.js';
import { render, screen } from '@testing-library/react';

test('batch select test', () => {
const testData = [
  {
    'id': '62a7bfd2eaaf121caad3968d',
    'course': 'Carolina',
    'price': 1983.2,
    'seats': 20,
    'start_date': '8/24',
    'end_date': '8/25',
    'time_zone': 'PST',
    'start_time': '2:00 PM',
    'end_time': '3:00 PM',
    'name': 'a',
  },
  {
    'id': '62a7bfd2c06e03b6a5eee2b5',
    'course': 'Aida',
    'price': 2404.7,
    'seats': 0,
    'start_date': '7/21',
    'end_date': '8/22',
    'time_zone': 'PST',
    'start_time': '2:00 AM',
    'end_time': '9:00 AM',
    'name': 'b',
  },
  {
    'id': '62a7bfd291832ebf9178b6d6',
    'course': 'Mcdonald',
    'price': 3980.2,
    'seats': 5,
    'start_date': '6/22',
    'end_date': '9/22',
    'time_zone': 'PST',
    'start_time': '2:00 AM',
    'end_time': '9:00 AM',
    'name': 'c',
  },
  {
    'id': '62a7bfd2338845a563edcacd',
    'course': 'Eloise',
    'price': 2853.6,
    'seats': 32,
    'start_date': '6/22',
    'end_date': '8/22',
    'time_zone': 'EST',
    'start_time': '3:00 PM',
    'end_time': '6:00 PM',
    'name': 'd',
  },
]

    render(
	<BatchSelect 
         batchData={testData} 
         onChange={
                      (batch_no, batchID) => { 
                          selectBatchID(batchID); 
                          selectBatchNo(batch_no);
                          console.log(batchID);
                          console.log(batch_no);
                      } 
              	  }
         value='-1'/>
    )
    const batch = screen.getByRole('table', { className: 'batch_description_box' });

    const tableBody = batch.tBodies;
    const tableHeader = batch.tHead;
    const tableFooter = batch.tFoot;

    const headTab = tableHeader.getElementsByTagName('th')[0];
    const bodyTab = tableBody[0].getElementsByTagName('td')[0];
    const footerTab = tableFooter.getElementsByTagName('td')[0];

    const headChildren = headTab.getElementsByTagName('p');
    const bodyChildren = bodyTab.getElementsByTagName('p');
    const footChildren = footerTab.getElementsByTagName('p');

    const selectButton = bodyTab.getElementsByTagName('button')[0];
    const footSelectButton = footerTab.getElementsByTagName('button')[0];

    console.log(bodyChildren[2].innerHTML);
    expect(headChildren[0].innerHTML.includes('8/24 - 8/25')).toBeTruthy();
    expect(headChildren[1].innerHTML.includes('Batch a')).toBeTruthy();
    expect(bodyChildren[0].innerHTML.includes('2:00 PM - 3:00 PM <b>PST</b>')).toBeTruthy();
    expect(selectButton.innerHTML.includes('20 LEFT')).toBeTruthy();
    expect(bodyChildren[2].innerHTML.includes('from<br><b>$1983.2</b><br>(Early Bird)')).toBeTruthy();
    expect(footChildren[0].innerHTML.includes('2:00 PM - 3:00 PM <b>EST</b>')).toBeTruthy();
    expect(footSelectButton.innerHTML.includes('20 LEFT')).toBeTruthy();
    expect(bodyChildren[2].innerHTML.includes('from<br><b>$1983.2</b><br>(Early Bird)')).toBeTruthy();
});
