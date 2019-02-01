import React, { Component } from 'react';
import './App.css';
import ComplexCard from './ComplexCard.js';

let website = 'https://freestyleadventuretravel.com';

class Cards extends Component {

    constructor() {
    super();

        this.state = {
            allPostTitles : false,
            posts: [],
            dataRoute: website + '/wp-json/wp/v2/posts?_embed',
        }

    }


    componentDidMount(){
        fetch(this.state.dataRoute)
        .then(res => res.json())
        .then(posts => this.setState((prevState, props) => {
            return { posts: posts.map(this.mapPosts)};
        }));
    }


    mapPosts(post){
        return {
          id: post.id,
          date: new Date(post.date).toLocaleDateString(),
          entryExcerpt: post.excerpt.rendered,
          entryContent: post.content.rendered,
          title: post.title.rendered,
          link: post.link,
        }
    }



    render() {

        return (
        <div className="cards">

          {this.state.posts.map((post) =>
            <div className="single-complex-card" key={`post-${post.id}}`}>
                <ComplexCard link={post.link} entryTitle={post.title} date={post.date} entryExcerpt={post.entryExcerpt} entryContent={post.entryContent} />
            </div>
          )}

        </div>);

    }

}


export default Cards;
