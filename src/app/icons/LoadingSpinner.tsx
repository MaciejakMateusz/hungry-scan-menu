type LoadingSpinnerType = {
    buttonMode?: boolean | null;
    customStyle?: object | null;
    customContainerStyle?: object | null;
}

export const LoadingSpinner = ({buttonMode, customStyle, customContainerStyle}: LoadingSpinnerType) => {

    return (
        <div className={buttonMode ? 'button-spinner-container' : 'spinner-container'}
             style={customContainerStyle ? customContainerStyle : {}}>
            <div className={buttonMode ? 'button-spinner' : 'spinner'}
                 style={customStyle ? customStyle : {}}/>
        </div>
    );
};