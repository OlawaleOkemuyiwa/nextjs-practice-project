//our-domain/new-meetup
import NewMeetupForm from '../../components/meetups/NewMeetupForm';

const NewMeetupPage = () => {

  const onAddMeetupHandler = meetupInfo => {
    console.log(meetupInfo)
  }

  return <NewMeetupForm retrieveMeetupData={onAddMeetupHandler} />
}

export default NewMeetupPage;

