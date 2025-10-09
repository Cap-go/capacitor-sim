package app.capgo.plugin.sim;

import com.getcapacitor.Logger;

public class Sim {

    public String echo(String value) {
        Logger.info("Echo", value);
        return value;
    }
}
