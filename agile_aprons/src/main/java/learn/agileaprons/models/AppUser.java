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
    private final String email;
    private final String displayName;
    private final String password;
    private final boolean enabled;
    private final Collection<GrantedAuthority> authorities;
    private List<Recipe> myRecipes;
    private List<Recipe> myFavorites;
    private List<GroceryList> myLists;



    public AppUser(int appUserId, String email, String displayName, String password, boolean enabled, List<String> roles) {
        this.appUserId = appUserId;
        this.email = email;
        this.displayName = displayName;
        this.password = password;
        this.enabled = enabled;
        this.authorities = convertRolesToAuthorities(roles);
        this.myLists = new ArrayList<>();
    }

    private static Collection<GrantedAuthority> convertRolesToAuthorities(List<String> roles) {
        return roles.stream()
                .map(r -> new SimpleGrantedAuthority(r))
                .collect(Collectors.toList());
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
        return email;
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