package app.capgo.plugin.sim;

import android.Manifest;
import android.annotation.SuppressLint;
import android.content.Context;
import android.os.Build;
import android.telephony.SubscriptionInfo;
import android.telephony.SubscriptionManager;
import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.Logger;
import com.getcapacitor.PermissionState;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.getcapacitor.annotation.Permission;
import com.getcapacitor.annotation.PermissionCallback;
import java.util.List;

@SuppressLint("InlinedApi")
@CapacitorPlugin(
    name = "Sim",
    permissions = {
        @Permission(strings = { Manifest.permission.READ_PHONE_STATE }, alias = SimPlugin.READ_PHONE_STATE),
        @Permission(strings = { Manifest.permission.READ_PHONE_NUMBERS }, alias = SimPlugin.READ_PHONE_NUMBERS)
    }
)
public class SimPlugin extends Plugin {

    private final String pluginVersion = "7.1.8";

    static final String READ_PHONE_STATE = "readPhoneState";
    static final String READ_PHONE_NUMBERS = "readPhoneNumbers";
    private static final String PERMISSION_DENIED_ERROR = "Unable to get information from SIM cards, user denied permission request.";

    @PluginMethod
    public void getSimCards(PluginCall call) {
        if (!isPermissionGranted()) {
            requestPhonePermissions(call);
            return;
        }

        SubscriptionManager subscriptionManager = (SubscriptionManager) getContext().getSystemService(
            Context.TELEPHONY_SUBSCRIPTION_SERVICE
        );

        JSArray carrierInfoCollection = subscriptionManager != null ? collectSubscriptionInfo(subscriptionManager) : new JSArray();

        JSObject result = new JSObject();
        result.put("simCards", carrierInfoCollection);

        call.resolve(result);
    }

    @PermissionCallback
    private void permissionCallback(PluginCall call) {
        if (!isPermissionGranted()) {
            Logger.debug(getLogTag(), "User denied SIM read permissions request.");
            call.reject(PERMISSION_DENIED_ERROR);
            return;
        }

        if ("getSimCards".equals(call.getMethodName())) {
            getSimCards(call);
        }
    }

    private void requestPhonePermissions(PluginCall call) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            requestPermissionForAliases(new String[] { READ_PHONE_NUMBERS, READ_PHONE_STATE }, call, "permissionCallback");
        } else {
            requestPermissionForAlias(READ_PHONE_STATE, call, "permissionCallback");
        }
    }

    private boolean isPermissionGranted() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            return (
                getPermissionState(READ_PHONE_NUMBERS) == PermissionState.GRANTED &&
                getPermissionState(READ_PHONE_STATE) == PermissionState.GRANTED
            );
        }

        return getPermissionState(READ_PHONE_STATE) == PermissionState.GRANTED;
    }

    @SuppressLint("MissingPermission")
    private JSArray collectSubscriptionInfo(SubscriptionManager subscriptionManager) {
        JSArray results = new JSArray();
        List<SubscriptionInfo> subscriptionInfoList = subscriptionManager.getActiveSubscriptionInfoList();

        if (subscriptionInfoList == null) {
            return results;
        }

        for (SubscriptionInfo subscriptionInfo : subscriptionInfoList) {
            JSObject carrierInfo = new JSObject();

            String number = null;
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
                number = subscriptionManager.getPhoneNumber(subscriptionInfo.getSubscriptionId());
            } else {
                number = subscriptionInfo.getNumber();
            }

            carrierInfo.put("number", number);
            carrierInfo.put("subscriptionId", Integer.toString(subscriptionInfo.getSubscriptionId()));
            carrierInfo.put("simSlotIndex", subscriptionInfo.getSimSlotIndex());
            carrierInfo.put("carrierName", subscriptionInfo.getCarrierName());
            carrierInfo.put("isoCountryCode", subscriptionInfo.getCountryIso());

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                carrierInfo.put("mobileCountryCode", subscriptionInfo.getMccString());
                carrierInfo.put("mobileNetworkCode", subscriptionInfo.getMncString());
            } else {
                carrierInfo.put("mobileCountryCode", Integer.toString(subscriptionInfo.getMcc()));
                carrierInfo.put("mobileNetworkCode", Integer.toString(subscriptionInfo.getMnc()));
            }

            results.put(carrierInfo);
        }

        return results;
    }

    @PluginMethod
    public void getPluginVersion(final PluginCall call) {
        try {
            final JSObject ret = new JSObject();
            ret.put("version", this.pluginVersion);
            call.resolve(ret);
        } catch (final Exception e) {
            call.reject("Could not get plugin version", e);
        }
    }
}
