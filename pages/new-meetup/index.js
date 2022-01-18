//our-domain/new-meetup

import { useRouter } from 'next/router';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';

const NewMeetupPage = () => {
  const router = useRouter()

  async function onAddMeetupHandler(meetupInfo) {
    //send post request to our created api route(new-meetup js file in api folder) and nextjs then triggers the execution of the exported function in new-meetup file which connects to mongoDb and saves the posted data there.
    const response = await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(meetupInfo),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    //get data from response if it is required
    const data = await response.json();

    console.log(data);

    router.push('/');

  }

  return <NewMeetupForm retrieveMeetupData={onAddMeetupHandler} />
}

export default NewMeetupPage;



