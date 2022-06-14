import { useEffect } from "react";
import baseUrl from "../../apiUrls";
import Loading from "../loading/loading";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../services/authentication";
import BatchSelect from "../../components/batch-select/batchSelect";

function BatchPageTest() {
	
  const testData = [
  {
    "id": "62a7bfd2eaaf121caad3968d",
    "course": "Carolina",
    "price": 1983.2,
    "seats": 5,
    "start_date": "Sat May 28 2022 12:24:29 GMT-0400 (Eastern Daylight Time)",
    "end_date": "Fri Sep 30 2022 03:33:04 GMT-0400 (Eastern Daylight Time)",
    "time_zone": "PST",
    "start_time": "Sun May 29 2022 07:21:43 GMT-0400 (Eastern Daylight Time)",
    "end_time": "Sat Jun 25 2022 22:49:23 GMT-0400 (Eastern Daylight Time)",
    "name": "a"
  },
  {
    "id": "62a7bfd2c06e03b6a5eee2b5",
    "course": "Aida",
    "price": 2404.7,
    "seats": 3,
    "start_date": "Wed Mar 16 2022 02:32:34 GMT-0400 (Eastern Daylight Time)",
    "end_date": "Fri Aug 12 2022 16:24:36 GMT-0400 (Eastern Daylight Time)",
    "time_zone": "PST",
    "start_time": "Wed Apr 27 2022 15:23:25 GMT-0400 (Eastern Daylight Time)",
    "end_time": "Fri Jul 29 2022 21:06:51 GMT-0400 (Eastern Daylight Time)",
    "name": "b"
  },
  {
    "id": "62a7bfd291832ebf9178b6d6",
    "course": "Mcdonald",
    "price": 3980.2,
    "seats": 3,
    "start_date": "Sat May 28 2022 04:43:37 GMT-0400 (Eastern Daylight Time)",
    "end_date": "Thu Dec 22 2022 04:43:58 GMT-0500 (Eastern Standard Time)",
    "time_zone": "PST",
    "start_time": "Fri Mar 18 2022 12:05:41 GMT-0400 (Eastern Daylight Time)",
    "end_time": "Sat Sep 17 2022 12:31:15 GMT-0400 (Eastern Daylight Time)",
    "name": "c"
  },
  {
    "id": "62a7bfd2338845a563edcacd",
    "course": "Eloise",
    "price": 2853.6,
    "seats": 7,
    "start_date": "Sun Mar 20 2022 03:03:47 GMT-0400 (Eastern Daylight Time)",
    "end_date": "Tue Aug 09 2022 02:27:59 GMT-0400 (Eastern Daylight Time)",
    "time_zone": "EST",
    "start_time": "Wed Mar 09 2022 13:28:10 GMT-0500 (Eastern Standard Time)",
    "end_time": "Sun Aug 14 2022 17:52:26 GMT-0400 (Eastern Daylight Time)",
    "name": "d"
  },
]
	return (
		<BatchSelect batchData={testData}/>
	);
}

export default BatchPageTest;
