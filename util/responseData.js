module.exports = {
    // 返回给前端的响应格式
    setResponse: ({
        _errorCode = 0,
        _errorMessage = null,
        _data = null
    }) => {
        return {
            errorCode: _errorCode,
            errorMessage: _errorMessage,
            data: _data,
        }
    }
}