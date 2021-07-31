import React from 'react';

export function InsertText({text, setText}: {
  text: string,
  setText: (t: string) => void,
}) {
	return (
		<div>
			<textarea
				cols={30}
				rows={10}
				onChange={e => {
					setText(e.target.value);
				}}
			>
				{text}
			</textarea>
		</div>
	);
}
