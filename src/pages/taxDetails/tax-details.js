import Page from "../../components/page/page";
import PageLeft from "./page-left";
import PageRight from "./page-right";

function TaxDetails () {
	return (
		<Page 
			leftChildren = {<PageLeft />} 
			rightChildren = {<PageRight />}
			leftWidth = '5/12' 
			rightWidth = '7/12' 
			maxWidth = '3xl'
		/>
	);
}

export default TaxDetails;