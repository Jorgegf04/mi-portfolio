package com.jorgeguijarro.portfolio.contact.exception;

public class TooManyRequestsException extends RuntimeException {
    public TooManyRequestsException() { super("Contact rate limit reached"); }
}
