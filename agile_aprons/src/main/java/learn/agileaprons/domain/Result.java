package learn.agileaprons.domain;

import java.util.ArrayList;
import java.util.List;

public class Result<T> {
    private final List<String> messages = new ArrayList<>();
    private T payload;
    private ResultType resultType = ResultType.SUCCESS;

    public T getPayload() {
        return payload;
    }

    public void setPayload(T payload) {
        this.payload = payload;
    }

    public void addMessage(String message){
        addMessage(message, ResultType.INVALID);
    }

    public void addMessage(String message, ResultType resultType){
        this.resultType = resultType;
        messages.add(message);
    }

    public List<String> getMessages(){
        return messages;
    }

    public boolean isSuccess(){
        return resultType == ResultType.SUCCESS;
    }

    public ResultType getResultType() {
        return resultType;
    }
}
