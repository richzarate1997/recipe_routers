package learn.agileaprons.controllers;

import learn.agileaprons.domain.Result;
import learn.agileaprons.domain.ResultType;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class ErrorResponse {
    public static <T> ResponseEntity<Object> build(Result<T> result) {
        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
        if (result.getResultType() == null || result.getResultType() == ResultType.INVALID) {
            status = HttpStatus.BAD_REQUEST;
        } else if (result.getResultType() == ResultType.NOT_FOUND) {
            status = HttpStatus.NOT_FOUND;
        }
        return new ResponseEntity<>(result.getMessages(), status);
    }

}
