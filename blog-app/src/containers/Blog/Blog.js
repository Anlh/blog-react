import React, {Component} from 'react';
import {
    Route,
    NavLink,
    Switch,
    Redirect
} from 'react-router-dom';

import './Blog.css';
import Posts from './Posts/Posts';
import asyncComponent from '../../hoc/asyncComponent';
// import NewPost from './NewPost/NewPost';

// This is specially useful to minimize the size of the main bundle that is shipped to the server
// This is called separately in a pre created chunk from webpack
const AsyncNewPost = asyncComponent(() => {
    // Dynamic import syntax
    return import('./NewPost/NewPost');
});

class Blog extends Component {
    state = {
        auth: true
    };

    render() {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink
                                to="/posts"
                                exact
                                activeClassName="my-active"
                                activeStyle={{
                                    color: '#fa923f',
                                    textDecoration: 'underline'
                                }}>Posts</NavLink></li>
                            {/* We can add a custom class to the active link */}
                            <li><NavLink to={{
                                pathname: '/new-post',
                                hash: '#submit',
                                search: '?quick-submit=true'
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                {/*<Route path="/" exact render={() => <h1>Home</h1>} />*/}
                <Switch>
                    {this.state.auth ? <Route path="/new-post" component={AsyncNewPost}/> : null}
                    <Route path="/posts" component={Posts}/>
                    {/* this route will handle with any route that has not been specified*/}
                    <Route render={() => <h1>404 Not found</h1>}/>
                    {/*<Redirect from="/" to="/posts"/>*/}
                    {/*<Route path="/" component={Posts}/>*/}
                </Switch>
            </div>
        );
    }
}

export default Blog;