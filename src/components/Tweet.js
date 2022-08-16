import { dbService, storageService } from "fbase";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Tweet = ({ tweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newTweet, setNewTweet] = useState(tweetObj.text);

    const onDeleteClick = async () => {
        const ok = window.confirm("삭제하시겠습니까?");
        if (ok) {
            await dbService.doc(`tweets/${tweetObj.id}`).delete();
            if (tweetObj.attachmentUrl !== "") {
                await storageService.refFromURL(tweetObj.attachmentUrl).delete();
            }
        }
    };

    const toggleEditing = () => setEditing((prev) => !prev);

    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNewTweet(value);
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.doc(`tweets/${tweetObj.id}`).update({ text: newTweet });
        setEditing(false);
    };

    return (
        <div className="tweet">
            {editing ? (
                <>
                    <form onSubmit={onSubmit} className="container tweetEdit">
                        <input
                            onChange={onChange}
                            value={newTweet}
                            required
                            placeholder="Edit your tweet"
                            autoFocus
                            className="formInput"
                        />
                        <input type="submit" value="Update Tweet" className="formBtn" />
                    </form>
                    <button onClick={toggleEditing} className="formBtn cancelBtn">
                        Cancel
                    </button>
                </>
            ) : (
                <>
                    <h4>{tweetObj.text}</h4>
                    {tweetObj.attachmentUrl && (
                        <img src={tweetObj.attachmentUrl} width="50px" height="50px" />
                    )}
                    {isOwner && (
                        <div className="nweet__actions">
                            <span onClick={onDeleteClick}>
                                <FontAwesomeIcon icon={faTrash} />
                            </span>
                            <span onClick={toggleEditing}>
                                <FontAwesomeIcon icon={faPencilAlt} />
                            </span>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Tweet;