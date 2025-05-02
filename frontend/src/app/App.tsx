import Redux from './redux';
import Routing from './routing';
import Auth from './auth';
import AuthEmployee from "./authEmployee"

function App(){
    return(
        <Redux>
            <Auth>
                <AuthEmployee>
                    <Routing />
                </AuthEmployee>
            </Auth>
        </Redux>
    )
}

export default App;