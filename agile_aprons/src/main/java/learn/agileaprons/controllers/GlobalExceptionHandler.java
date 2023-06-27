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
        return reportException("Duplicate entry.");
    }

    @ExceptionHandler
    public ResponseEntity<?> handleException(HttpMessageNotReadableException ex) {
        return reportException("Badly formed JSON.");
    }

    @ExceptionHandler
    public ResponseEntity<?> handleException(Exception ex) {
        return reportException("Something went wrong :(");
    }

    private ResponseEntity<?> reportException(String message) {
        List<String> messages = List.of(message);
        return new ResponseEntity<>(messages, HttpStatus.BAD_REQUEST);
    }
}
