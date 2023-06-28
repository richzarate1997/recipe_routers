package learn.agileaprons.models;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public class AppUser implements UserDetails {

    private int appUserId;
    private String username;
    private String password;
    private boolean enabled;
    private Collection<GrantedAuthority> authorities;
    private String displayName;
    private boolean isMetric;
    private List<Recipe> myRecipes;
    private List<Recipe> myFavorites;
    private List<GroceryList> myLists;

    public AppUser(int appUserId, String username, String password, boolean enabled, List<String> roles) {
        this.appUserId = appUserId;
        this.username = username;
        this.password = password;
        this.enabled = enabled;
        this.authorities = convertRolesToAuthorities(roles);
    }

    public AppUser() {}

    private static Collection<GrantedAuthority> convertRolesToAuthorities(List<String> roles) {
        return roles.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public boolean isMetric() {
        return isMetric;
    }

    public void setMetric(boolean metric) {
        isMetric = metric;
    }

    public String getDisplayName() {
        return displayName;
    }

    @Override
    public Collection<GrantedAuthority> getAuthorities() {
        return new ArrayList<>(authorities);
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }

    public int getAppUserId() {
        return appUserId;
    }

    public void setAppUserId(int appUserId) {
        this.appUserId = appUserId;
    }
    public List<Recipe> getMyRecipes() {
        return myRecipes;
    }

    public void setMyRecipes(List<Recipe> myRecipes) {
        this.myRecipes = myRecipes;
    }

    public List<Recipe> getMyFavorites() {
        return myFavorites;
    }

    public void setMyFavorites(List<Recipe> myFavorites) {
        this.myFavorites = myFavorites;
    }

    public List<GroceryList> getMyLists() {
        return myLists;
    }

    public void setMyLists(List<GroceryList> myLists) {
        this.myLists = myLists;
    }
}