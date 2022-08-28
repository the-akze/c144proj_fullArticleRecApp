import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default class App extends React.Component
{
  constructor() {
    super();

    this.state = {
      articles: [
        "sample",
        "article",
        "data",
        "if",
        "the",
        "stuff",
        "doesn't",
        "load"
      ]
    }
  }

  componentDidMount() {
    this.fetchArticles();
  }

  render()
  {
    console.log("articles:", this.state.articles);
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Articles</Text>

        <TouchableOpacity style={styles.button} onPress={this.fetchArticles}>
          <Text>
            Refresh
          </Text>
        </TouchableOpacity>

        <FlatList
        data={this.state.articles}
        keyExtractor={(item, index) => {return index.toString()}}
        renderItem={this.renderItem}
        style={styles.flatList}
        />
      </View>
    );
  }

  renderItem = ({item, index}) => {
    return (
      <View style={styles.listArticle}>
        <Text style={styles.listArticleName}>
          {item}
        </Text>
        <View style={styles.articleButtonContainer}>
          <TouchableOpacity style={styles.articleButton} onPress={() => {this.articleFeedback(item, 1)}}>
            <Text style={styles.articleButtonText}>👍</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.articleButton} onPress={() => {this.articleFeedback(item, -1)}}>
            <Text style={styles.articleButtonText}>👎</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.articleButton} onPress={() => {this.articleFeedback(item, 0)}}>
            <Text style={styles.articleButtonText}>❌</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  articleFeedback = async (article, feedback) => {
    switch (feedback) {
      case 1:
        await fetch("http://127.0.0.1:5000/like?name=" + encodeURIComponent(article), {method: "POST"});
        // alert("liked article: " + article);
        break;
      case 0:
        await fetch("http://127.0.0.1:5000/unwatch?name=" + encodeURIComponent(article), {method: "POST"});
        // alert("unwatched article: " + article);
        break;
      case -1:
        await fetch("http://127.0.0.1:5000/dislike?name=" + encodeURIComponent(article), {method: "POST"});
        // alert("disliked article: " + article);
        break;
    
      default:
        break;
    }

    var a = this.state.articles;
    var i = a.indexOf(article);
    a.splice(i, 1);
    this.setState({articles: a});
  }

  fetchArticles = async () => {
    var request;
    try {
      request = await fetch("http://127.0.0.1:5000/unvoted");
      var jsonData = await request.json();
      this.setState({articles: jsonData.data});
    } catch (e) {
      alert("failed to fetch home; maybe the server is offline");
      console.log(e);
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginVertical: 20
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: "gray"
  },
  flatList: {
    marginTop: 20,
  },
  listArticle: {
    width: "100%",
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: "gray",
    borderRadius: 20,
    marginBottom: 5,
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center'
  },
  listArticleName: {
    fontSize: 20,
    color: 'white',
  },
  articleButton: {
    backgroundColor: "silver",
    margin: 5,
    borderRadius: 10,
    padding: 5,
    paddingHorizontal: 10
  },
  articleButtonText: {
    fontSize: 25,
  },
  articleButtonContainer: {
    display: 'flex',
    flexDirection: 'row'
  }
});
