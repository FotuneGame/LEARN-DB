import Redux from './redux';
import Routing from './routing';
import Auth from './auth';

function App(){
    return(
        <Redux>
            <Auth>
                <Routing />
            </Auth>
        </Redux>
    )
}

export default App;