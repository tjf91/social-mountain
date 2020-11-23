import React, { Component } from 'react';

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import axios from 'axios';
import Post from './Post/Post';

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
    this.search=this.search.bind(this)
  }
  
  componentDidMount() {
    axios
    .get('https://practiceapi.devmountain.com/api/posts')
    .then(res=>this.setState({posts:res.data}))
    .catch(e=>console.log(e))
  }

  updatePost(id,text) {
    axios
    .put(`https://practiceapi.devmountain.com/api/posts?id=${id}`,{text})
    .then(res=>{
      console.log(text)
      this.setState({posts:res.data})})
    .catch(e=>console.log(e))
  }

  deletePost(id) {
    axios
    .delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`)
    .then(res=>this.setState({posts:res.data}))
    .catch(e=>console.log(e))
  }

  createPost(text) {
    axios
    .post(`https://practiceapi.devmountain.com/api/posts`, {text})
    .then(res=>this.setState({posts:res.data}))
    .catch(e=>console.log(e))
  }
  search(input){
    console.log("searching")
    axios
    .get(`https://practiceapi.devmountain.com/api/posts/filter?text=${encodeURI(input)}`)
    .then(res=>{
      console.log(res.data)
      this.setState({posts:res.data})
      
    }
      )


    .catch(e=>console.log(e))
  }


  render() {
    const { posts } = this.state;
    const mapped = posts.map(post=>{
      return(
              <Post 
              updatePostFn={this.updatePost}
              deletePostFn={this.deletePost}
              key ={post.id}
              text={post.text}
              date={post.date}
              id={post.id}
              />
                    )
              })

    return (
      <div className="App__parent">
        <Header
        searchFn={this.search} />

        <section className="App__content">

          <Compose
            createPostFn={this.createPost}
          />
          {mapped}
        </section>
      </div>
    );
  }
}

export default App;
