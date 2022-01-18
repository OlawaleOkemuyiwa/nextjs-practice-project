//our-domain/concrete-value(of a dynamic path segment)

import { MongoClient } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";

const MeetupDetails = props => {
  return (
    <MeetupDetail 
      image={props.meetupData.image}
      title={props.meetupData.title}
      address={props.meetupData.address}
      description={props.meetupData.description}
    />
  )
}

export async function getStaticPaths() {     //CCC3: required when we are dealing with getStaticProps in a dynamically generated page to specify to nextJS for which dynamic parameter values(concrete values in a dynamic path segment) this page should be pre-generated for
  const client = await MongoClient.connect('mongodb+srv://OlawaleOkemuyiwa:1Oluwaseun_@cluster0.enqpf.mongodb.net/themeetups?retryWrites=true&w=majority');
  const themeetupsdb = client.db();
  const meetupsCollection = themeetupsdb.collection('meetups');

  //get documents in the collection with only their id property with no other field values
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray(); //first argument is object to specify the criteria of finding. We dont have any so its empty

  client.close();
  
  return {
    fallback: false,                        //if set to false then it means the paths array property down here includes all supported meetup ID values and if an unknown concrete id value is accessed, an error 404 code should be displayed. If set to true, then if an unspecifed id value is accessed nextJS will try to generate a page for such meetup ID dynamically on the server for the incoming request.
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
  const selectedMeetup = await meetupsCollection.findOne({ _id: meetupId }); //find the document in meetsup collection whose _id property === meetup id gotten from URL 
  
  return {
    props: {
      meetupData: selectedMeetup
    }
  }
} 

export default MeetupDetails;
