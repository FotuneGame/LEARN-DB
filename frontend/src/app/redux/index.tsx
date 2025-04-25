import { ReactElement } from 'react';
import { Provider } from 'react-redux';
import {store} from '@/shared/store';



function Redux(props:{children: ReactElement}){
    return(
        <Provider store={store}>
            {props.children}
        </Provider>
    )
}

export default Redux;