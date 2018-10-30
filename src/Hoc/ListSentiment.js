import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';

const ListSentimentQuery = gql`
{
  listSentiments {
    items {
      senderId
      positive
      neutral
      negative
    }
  }
}`;

const NewSentimentSubscription = gql`
subscription {
  onCreateSentiment {
    senderId
    positive
    neutral
    negative
  }
}`;

const UpdatedSentimentSubscription = gql`
subscription {
  onUpdateSentiment {
    senderId
    positive
    neutral
    negative
  }
}`;

export default compose(
  graphql(ListSentimentQuery, {
      options: {
          fetchPolicy: 'cache-and-network'
      },
      props: (props) => ({
        sentimentList: props.data.listSentiments,
        subscribeToNewSentiment: params => {
          props.data.subscribeToMore({
            document: NewSentimentSubscription,
            updateQuery: (prev, { subscriptionData: { data : { onCreateSentiment } } }) => {
              console.log('new sentiment data', onCreateSentiment);
              return {
                ...prev,
                listSentiments: { 
                  items: [onCreateSentiment, ...prev.listSentiments.items.filter(item => item.senderId !== onCreateSentiment.id)], 
                  __typename: 'SentimentConnection' 
                }
              };
            }
          });

          props.data.subscribeToMore({
            document: UpdatedSentimentSubscription,
            updateQuery: (prev, { subscriptionData: { data : { onUpdateSentiment } } }) => {
              console.log('updated sentiment data', onUpdateSentiment)
              return {
                ...prev,
                listSentiments: { 
                  items: prev.listSentiments.items.map(item => item.senderId !== onUpdateSentiment.id ? item : onUpdateSentiment), 
                  __typename: 'SentimentConnection' 
                }
              };
            }
        });
        },
      })
  })
);
