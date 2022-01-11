//our-domain/concrete-value(of a dynamic path segment)

import { useRouter } from "next/router";
import { Fragment } from "react";
import MeetupDetail from "../../components/meetups/MeetupDetail";

const MeetupDetails = () => {
  const router = useRouter();
  console.log(router.query.meetupId);

  return (
    <MeetupDetail 
      image='www.someshit.com'
      title='First Meetup'
      address='718 Kroos block, munich, Germany'
      description='This is a first meetup'
    />
  )
}

export default MeetupDetails;
