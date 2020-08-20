import React from "react";
import PropTypes from "prop-types";
import ContestPreview from "./ContestPreview";

const ContestList = ({ contests, onContestClick }) => (
    <div className="ContestList">
        {Object.keys(contests).map(contestId =>
            <ContestPreview
                key={contestId}
                onClick={onContestClick}
                {...contests[contestId]} />
        )}
    </div>
);

ContestList.propTypes = {
    contests: PropTypes.object,
    onContestClick: PropTypes.func.isRequired
};

export default ContestList;

/* JSX spread operator => {...contests}
 We are passing in the properties of contests and applying them to ContestPreview
 contests : [{
            id: ...
            categoryName: ...
            contestName: ...
},
{...}
]
So the spread operator passes id, categoryName and contestName into ContestPreview as props
*/