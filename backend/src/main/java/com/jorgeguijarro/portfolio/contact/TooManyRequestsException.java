package com.jorgeguijarro.portfolio.contact;

public class TooManyRequestsException extends RuntimeException {
    public TooManyRequestsException() { super("Contact rate limit reached"); }
}
