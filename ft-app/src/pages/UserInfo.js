import {gql, useQuery} from '@apollo/client';

import '../index.css'

const UserInfo = ({userId}) => {
    const GET_USER_DETAILS = gql`
        query UserInfo($userId: Uuid!) {
          user(filter: {
            user_id: {eq: $userId}}) {
            values {
              firstname,
              lastname
              user_id,
              age,
              calorie_goal,
              macro_goal,
              meals {
                item0,
                item1,
                item2,
              },
              workouts {
                key,
                value,
              },
            }
          }
        }`;

  const {error, loading, data} = useQuery(GET_USER_DETAILS, { variables: {userId}});

  if (loading) return 'Loading...';
  if (error) return(<div>Error: {error.message} </div>);

  if (!data.user.values[0]) {
    return (
        <div><h1>Unknown user</h1></div>
    );
  }

  const user = data.user.values[0];

  var today = new Date();
  var today_date_str = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

  var today_meals = 0;
  if (user.meals) {
      for (let meal of user.meals) {
        var meal_date = new Date(meal.item2);
        var meal_date_str = meal_date.getFullYear() + '-' + (meal_date.getMonth() + 1) + '-' + meal_date.getDate();
        if (meal_date_str === today_date_str) {
            today_meals++;
        }
      }
  }

  return (
    <div>
      <h1>{user.firstname}' stats</h1>
      <div>Number of meals: {today_meals}</div>
      <div>Calorie goal: {user.calorie_goal}</div>
    </div>
  );
}

export default UserInfo;
