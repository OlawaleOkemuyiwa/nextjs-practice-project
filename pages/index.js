//our-domain/
import MeetupList from '../components/meetups/MeetupList';

const DUMMY_MEETUPS = [
  {
    id: 'm1',
    title: 'A First meetup',
    Image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Frauenkirche_and_Neues_Rathaus_Munich_March_2013.JPG/1280px-Frauenkirche_and_Neues_Rathaus_Munich_March_2013.JPG',
    address: '718 Kroos block, munich, Germany',
    desscription: 'This is a first meetup'
  }, {
    id: 'm2',
    title: 'A Second meetup',
    Image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Frauenkirche_and_Neues_Rathaus_Munich_March_2013.JPG/1280px-Frauenkirche_and_Neues_Rathaus_Munich_March_2013.JPG',
    address: '7 Unity estate, Ikeja, Nigeria',
    desscription: 'This is a second meetup'
  }

];

const HomePage = props => {
  console.log('HomePage running')
  return <MeetupList meetups={props.loadedMeetups} />
}

export async function getStaticProps() {
  //data fetching 

  return {
    props: {
      loadedMeetups: DUMMY_MEETUPS
    },
    revalidate: 60
  }
}

export default HomePage;

//getStaticProps is a special function name exported from a component file (it only works in files of the pages folder) for data fetching or to run codes that would normally only run on the server(access a file system or secured connect to the database). getStaticProps's job is to prepare props for this page(i.e to get data which this component needs). The function is executed during pre-rendering build process (not on sever and esp not on client/browsers of visistors) before the component function is executed. The function is asynchronous so nextjs waits for the fetching data etc to be done then the loaded data is returned to the component function as props. The component function is then executed as a normal component and its JSX code rendered
//one problem faced with using this function is that the data feched can become outdated. This page pages/index.js is a static site and is generated during the build process(npm run build) so after the web app is deployed, when more meetupds are added to the database this pregenerated page wont know about them(only aware of the data it has during thre build process) so when no client-side data fetching is added, we always see the outdated meetups. If data doesnt change frequently such web app, we can simply just rebuild the site and redeploy with the update data(e.g personal blogs as data dont change frequently). If data changes frequently, an extra property added to the returned object called "revalidate" whose value represent the number of secs nextJS will wait until it regenerates this page for an incoming request. Therefore the page will not only be generated during the build process but also after Xsecs on the server when there are requests coming in for this page. Then the regenerated page(now with updated data) replaces the former pregenerated page. the data is then never older than X secs. X time depends on data update frequency (maybe data changes every minute => X = 60s)
//revalidate just makes sure this page will be occassionaly re-pregenerated on the server even after deployment (after build process is over) so that we dont have to re-build and re-deploy every time there is a data change in our website