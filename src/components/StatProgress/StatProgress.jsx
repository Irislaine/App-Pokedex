import React from 'react';
import './statProgress.css';

const StatProgress = ({statName, statValue}) => {
    const statPercentage = statValue * 100 / 150 

    
    return (
        <li className='stat_progress'>
            <div className='stat_info'>
                <span className='stat_name'>{statName}</span>
                <span className='stat_value'>{statValue}/150</span>
            </div>

            <div className='progress_bar'>
                <div className='progress' style={{ width: `${statPercentage}%` }}></div>
            </div>
        </li>
    )
}

export default StatProgress;