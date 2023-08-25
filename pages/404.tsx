
/**
 * The commented out import statement below is an example on why importing styles that way causes an error in next js.
 * 
 * It is because if we do not add ".module" to the name of the css file, next js considers it to be a global css file and does not allow importing global css files from a file other than "_app.tsx/js"
 */

// import styles from '../styles/NotFound.css'

/**
 * The import statement below shows the proper way to name a css file.
 */
// import styles from '../styles/NotFound.module.css'

const NotFound = () => {
    return (
        <div>
            404 Not Found Joe!
        </div>
    )
}

export default NotFound;