import React from 'react';
import './UrlContainer.css';
import UrlCard from '../../components/UrlCard/UrlCard'

const UrlContainer = ({urls}) => {
	console.log('urls', urls)
  const urlEls = urls.map(url => {

		console.log('url', url)
    return (
			<UrlCard 
				id={url.id}
				key={url.id}
				title={url.title}
				long_url={url.long_url}
				short_url={url.short_url}
			/>
    )
  });
console.log('urlsEls', urlEls)
  return (
    <section>
      { urlEls.length > 0 ? urlEls : <p>No urls yet! Find some to shorten!</p> }
    </section>
  )
}

export default UrlContainer;
