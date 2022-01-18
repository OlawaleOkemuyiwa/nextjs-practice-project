import { MongoClient } from 'mongodb';
//CCC6: When a package is imported in files in pages folder and that package is only used in getS~~~~s functions(used only on the server), nextJS will detect this and not include such package in client side bundle. This is good for secuirity and to reduce file size
import Head from 'next/head';
import { Fragment } from 'react';
import MeetupList from '../components/meetups/MeetupList';


const HomePage = props => {
  return (
    <Fragment>
      <Head>
        <title>React meetups</title>
        <meta name='description' content='Browse a huge list of highly active React meetups!'></meta>
      </Head>
      <MeetupList meetups={props.loadedMeetups} />
    </Fragment>
  )
}

/*
export async function getServerSideProps(context) {
  const req = context.req;
  const res = context.res;

  //data fetching 

  return {
    props: {
      loadedMeetups: DUMMY_MEETUPS
    }
  }
} */

export async function getStaticProps() {
  //data fetching from an API or server side codes
  
  //CCC5: instead of creating an api route and sending a request to it in order fetch required data. We can directly and securely do the server side coding right here inside getStaticProps 
  const client = await MongoClient.connect('mongodb+srv://OlawaleOkemuyiwa:1Oluwaseun_@cluster0.enqpf.mongodb.net/themeetups?retryWrites=true&w=majority');

  const themeetupsdb = client.db();

  //reach out to meetups collection in the database
  const meetupsCollection = themeetupsdb.collection('meetups');
  
  //find() by default gets all the documents in a collection then we convert to an array of document
  const meetups = await meetupsCollection.find().toArray();

  //close db connection
  client.close();

  //transform fetched meetups data
  const transformedMeetups = meetups.map(meetup => ({
    id: meetup._id.toString(),
    title: meetup.title,
    address: meetup.address,
    image: meetup.image
  }))

  return {
    props: {
      loadedMeetups: transformedMeetups
    },
    revalidate: 60
  }
}

export default HomePage;

//CCC2:
//getStaticProps is a special function name exported from a component file (it only works in files of the pages folder) for data fetching or to run codes that would normally only run on the server(access a file system or secured connection to a database). getStaticProps's job is to prepare props for this page(i.e to get data which this component needs). The function is executed during pre-rendering build process i.e whenever this page is pre-generated (not on sever and esp not on client/browsers of visistors) before the component function is executed. The function is asynchronous so nextjs waits for the fetching data etc to be done then the loaded data is returned to the component function as props. The component function is then executed as a normal component and its JSX code rendered
//one problem faced with using this function is that the data feched can become outdated. This page pages/index.js is a static site and is generated during the build process(npm run build) so after the web app is deployed, when more meetupds are added to the database this pregenerated page wont know about them(only aware of the data it has during thre build process) so when no client-side data fetching is added, we always see the outdated meetups. If data doesnt change frequently such web app, we can simply just rebuild the site and redeploy with the update data(e.g personal blogs as data dont change frequently). If data changes frequently, an extra property added to the returned object called "revalidate" whose value represent the number of secs nextJS will wait until it regenerates this page for an incoming request. Therefore the page will not only be generated during the build process but also after Xsecs on the server when there are requests coming in for this page. Then the regenerated page(now with updated data) replaces the former pregenerated page. the data is then never older than X secs. X time depends on data update frequency (maybe data changes every minute => X = 60s)
//revalidate just makes sure this page will be occassionaly re-pregenerated on the server even after deployment (after build process is over) so that we dont have to re-build and re-deploy every time there is a data change in our website

//getServerSideProps is used when regular update is not enough and we really want to regenerate this page FOR EVERY INCOMING REQUEST. So that the page is pregenerated dynamically on the fly after deployment on the server(not during building process nor after couple seconds)
//using getServerSideProps can be disadvantageous cause we need to wait for our page to be generated on every incoming request. if we dont have data that changes all the time(changing multiple times within a sec) and we dont need to acess to the req obj for auth then getStaticProps is better. 

//CCC7: when we're done coding, for a nextjs project or any kind of web project we're doing we should always check the metadata that be added to our pages. If we inspect the html code of nextjs projects, the head section is relatively empty with missing description meta tag and also page title etc which are important for search engine crawlers. We can add the title and description in the index.js file by importing a special component called Head(a component which allows us add head component to the head section of the page)