package learn.agileaprons.controllers;

import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.List;
@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler
    public ResponseEntity<?> handleException(DuplicateKeyException ex) {
        return reportBadRequest("Duplicate entry.");
    }

    @ExceptionHandler
    public ResponseEntity<?> handleException(HttpMessageNotReadableException ex) {
        return reportBadRequest("Badly formed JSON.");
    }

    @ExceptionHandler
    public ResponseEntity<?> handleException(Exception ex) {
        return reportException("Something went wrong :(", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private ResponseEntity<?> reportBadRequest(String message) {
        return reportException(message, HttpStatus.BAD_REQUEST);
    }
    private ResponseEntity<?> reportException(String message, HttpStatus httpStatus) {
        List<String> messages = List.of(message);
        return new ResponseEntity<>(messages, HttpStatus.BAD_REQUEST);
    }
}
