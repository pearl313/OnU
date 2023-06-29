import { MyCalendar } from './Calendar';
import Taking from './MyTaking';
import Review from './MyReview';
import Interest from './MyInterest';

export const Component = (props: {
  page: number;
}): React.ReactElement => {
  switch (props.page) {
    case 1:
      return <Interest />;
    case 2:
      return <Review />;
    case 3:
      return <Taking />;
    default:
      return <div></div>;
  }
};
