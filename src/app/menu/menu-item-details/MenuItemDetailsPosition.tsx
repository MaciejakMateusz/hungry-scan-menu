type MenuItemDetailsPositionType = {
    name: string;
    price: string;
}

export const MenuItemDetailsPosition = ({name, price}: MenuItemDetailsPositionType) => {
    return (
        <div className={'details-list-position-container'}>
            <span className={'details-list-position-text'}>{name}</span>
            <span className={'details-list-addition-price'}>{price}</span>
        </div>
    );
}