import { dbService } from "fbase";

const Tweet = ({ tweetObj, isOwner }) => {
    const onDeleteClick = async () => {
        const ok = window.confirm("삭제하시겠습니까?");
        if (ok) {
            const data = await dbService.doc(`tweets/${tweetObj.id}`).delete();
        }
    };

    return (
        <div>
            <h4>{tweetObj.text}</h4>
            {isOwner && (
                <>
                    <button onClick={onDeleteClick}>Delete Tweet</button>
                    <button>Edit Tweet</button>
                </>
            )}
        </div>
    );
};

export default Tweet;