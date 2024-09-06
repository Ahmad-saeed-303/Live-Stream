import './App.css'
import '@stream-io/video-react-sdk/dist/css/styles.css'
import {
  User,
  StreamVideoClient,
  StreamVideo,
  StreamCall,
} from '@stream-io/video-react-sdk'
import { MyLivestreamUI } from './components/MyLivestreamUI';


const apiKey = "mmhfdzb5evj2";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3Byb250by5nZXRzdHJlYW0uaW8iLCJzdWIiOiJ1c2VyL1dhdHRvIiwidXNlcl9pZCI6IldhdHRvIiwidmFsaWRpdHlfaW5fc2Vjb25kcyI6NjA0ODAwLCJpYXQiOjE3MjU0NjA5NTAsImV4cCI6MTcyNjA2NTc1MH0.jXngB5o4vnlPTsdgbhoDIZfI7SdxmDII2cdcRWgh4kA";
const userId = "Watto";
const callId = "0errwGgkdqR3";

// set up the user object 
const user: User = {
  id: userId,
  name: 'adam',
  image: 'https://getstream.io/random_svg/?id=stefan&name=Stefan',
};

const client = new StreamVideoClient({ apiKey, user, token });
const call = client.call('livestream', callId);
call.join({ create: true });

function App() {
  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <MyLivestreamUI/>
      </StreamCall>
    </StreamVideo>
  )
}

export default App


