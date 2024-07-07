

const Editor = ({ placeholder }) => {


	const config = useMemo(
		{
			readonly: false,
			placeholder: placeholder || 'Start typings...'
		},
		[placeholder]
	);

	return (
		<>
		</>
		
	);
};


export default Editor;