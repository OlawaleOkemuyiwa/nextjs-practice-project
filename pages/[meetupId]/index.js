//our-domain/concrete-value(of a dynamic path segment)

import { MongoClient, ObjectId } from "mongodb";
import { Fragment } from "react";
import Head from "next/head";
import MeetupDetail from "../../components/meetups/MeetupDetail";

const MeetupDetails = props => {
  return (
    <Fragment>
      <Head>
        <title>{props.title}</title>
        <meta name='description' content={props.description}></meta>
      </Head>
      <MeetupDetail 
        image={props.image}
        title={props.title}
        address={props.address}
        description={props.description}
      />
    </Fragment>
  )
}

export async function getStaticPaths() {     //CCC3: required when we are dealing with getStaticProps in a dynamically generated page to specify to nextJS for which dynamic parameter values(concrete values in a dynamic path segment) this page should be pre-generated for
  const client = await MongoClient.connect('mongodb+srv://OlawaleOkemuyiwa:1Oluwaseun_@cluster0.enqpf.mongodb.net/themeetups?retryWrites=true&w=majority');
  const themeetupsdb = client.db();
  const meetupsCollection = themeetupsdb.collection('meetups');

  //get documents in the meetups collection with only their id property with no other field values
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray(); //first argument is object to specify the criteria of finding. We dont have any so its empty

  client.close();
  
  return {
    fallback: 'blocking',                        //if set to false then it means the paths array property down here includes all supported meetup ID values and if an unknown concrete id value is accessed, an error 404 code should be displayed. If set to true or 'blocking', then if an unspecifed id value is accessed nextJS will try to generate a page for such meetup ID dynamically on the server for the incoming request.
    paths: meetups.map(meetup => ({
      params: {
        meetupId: meetup._id.toString()
      }
    })) 
  }
}

export async function getStaticProps(context) {
  const { meetupId } = context.params;

  //fetch data for a single meetup or any other server side code
  const client = await MongoClient.connect('mongodb+srv://OlawaleOkemuyiwa:1Oluwaseun_@cluster0.enqpf.mongodb.net/themeetups?retryWrites=true&w=majority');
  const themeetupsdb = client.db();
  const meetupsCollection = themeetupsdb.collection('meetups');
  const selectedMeetup = await meetupsCollection.findOne({ _id: ObjectId(meetupId) }); //find the document in meetsup collection whose _id property === meetup id gotten from URL 

  return {
    props: {
      id: selectedMeetup._id.toString(),
      title: selectedMeetup.title,
      address: selectedMeetup.address,
      image: selectedMeetup.image,
      description: selectedMeetup.description
    }
  }
} 

export default MeetupDetails;
