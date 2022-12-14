import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default class App extends React.Component
{
  constructor() {
    super();

    this.state = {
      articles: [
        "sample",
        "recommendation",
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
        <Text style={styles.title}>Articles for You</Text>

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
      </View>
    )
  }

  fetchArticles = async () => {
    var request;
    try {
      request = await fetch("http://127.0.0.1:5000/recommendations");
      var jsonData = await request.json();
      this.setState({articles: jsonData.data});
    } catch (e) {
      alert("failed to fetch recommended; maybe the server is offline");
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
    // display: 'flex',
    // flexDirection: 'row',
    backgroundColor: "white",
    borderColor: "gray",
    borderWidth: 2,
    borderRadius: 20,
    marginBottom: 5,
    justifyContent: 'space-between',
    padding: 10,
    // alignItems: 'center'
  },
  listArticleName: {
    fontSize: 20,
    color: 'black',
  },
  listArticleSubtitle: {
    color: "gray",
    fontStyle: 'italic'
  },
  listArticleContent: {
    maxWidth: 800,
    fontSize: 12,
    alignSelf: 'center',
    backgroundColor: 'silver',
    borderRadius: 10,
    padding: 8
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
