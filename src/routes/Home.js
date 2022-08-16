import { dbService } from "fbase";
import { useEffect, useState } from "react";
import Tweet from "components/Tweet";
import TweetFactory from "components/TweetFactory";

const Home = ({ userObj }) => {
    const [tweets, setTweets] = useState([]);

    useEffect(() => {
        dbService.collection("tweets").onSnapshot((snapshot) => {
            const newArray = snapshot.docs.map((document) => ({
                id: document.id,
                ...document.data(),
            }));
            setTweets(newArray);
        });
    }, []);

    return (
        <>
            <TweetFactory userObj={userObj} />
            <div>
                {tweets.map((tweet) => (
                    <Tweet
                        key={tweet.id}
                        tweetObj={tweet}
                        isOwner={tweet.creatorId === userObj.uid}
                    />
                ))}
            </div>
        </>
    );
};

export default Home;