export const MICROSERVICES = {
    TRANSACTIONS: {
        PATH: '/transaction',
        ENDPOINTS: {
            CREATE_TRANSACTION: '/create-multiple',
            GET_TRANSACTION: (transaction_id: string) => {
                return `/${transaction_id}` 
            } ,
            UPDATE_TRANSACTION: '/update-multiple',
            DELETE_TRANSACTION: '/delete-multiple',

        }
    }
}