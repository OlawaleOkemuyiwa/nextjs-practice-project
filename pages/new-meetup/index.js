//our-domain/new-meetup

import { useRouter } from 'next/router';
import { Fragment } from 'react';
import Head from 'next/head';
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

  return (
    <Fragment>
      <Head>
        <title>Add a new meetup</title>
        <meta name='description' content='Add your own meetups and create amazing networking opportunities'></meta>
      </Head>
      <NewMeetupForm retrieveMeetupData={onAddMeetupHandler} />
    </Fragment>
  )
}

export default NewMeetupPage;



