import React from 'react'
import './UrlCard.css'

const UrlCard = ({id, key, title, long_url, short_url}) => {
	return(
		<div className="url-card" id={`url-card-${id}`}>
			<h3>{title}</h3>
			<a href={short_url} target="blank">{short_url}</a>
			<p>{long_url}</p>
		</div>
	)
}

export default UrlCard