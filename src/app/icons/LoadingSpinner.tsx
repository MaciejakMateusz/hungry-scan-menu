type LoadingSpinnerType = {
    customContainerStyle?: object | null;
}

export const LoadingSpinner = ({customContainerStyle}: LoadingSpinnerType) => {

    return (
        <div className={'spinner-container'} style={customContainerStyle ? customContainerStyle : {}}>
            <div className={'loader'}/>
        </div>
    );
};